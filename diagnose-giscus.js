// Diagnose Giscus 404 error
require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.NEXT_PUBLIC_GISCUS_REPO;
const [OWNER, REPO_NAME] = REPO.split('/');

console.log('🔍 Giscus 404 Error Diagnosis\n');
console.log(`Repository: ${OWNER}/${REPO_NAME}\n`);

async function checkRepository() {
  // Check 1: Repository exists and is accessible
  console.log('1️⃣ Checking if repository is accessible...');
  try {
    const repoResponse = await fetch(`https://api.github.com/repos/${OWNER}/${REPO_NAME}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!repoResponse.ok) {
      console.log(`   ❌ Repository not accessible: ${repoResponse.status} ${repoResponse.statusText}`);
      return;
    }

    const repoData = await repoResponse.json();
    console.log(`   ✅ Repository found: ${repoData.full_name}`);
    console.log(`   ℹ️  Visibility: ${repoData.private ? 'Private' : 'Public'}`);
    console.log(`   ℹ️  Has Discussions: ${repoData.has_discussions ? 'Yes ✅' : 'No ❌'}\n`);

    if (!repoData.has_discussions) {
      console.log('   🚨 PROBLEM: Discussions are NOT enabled!\n');
      console.log('   💡 SOLUTION:');
      console.log('      1. Go to: https://github.com/' + OWNER + '/' + REPO_NAME + '/settings');
      console.log('      2. Scroll to "Features"');
      console.log('      3. Check ✅ "Discussions"\n');
      return;
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}\n`);
    return;
  }

  // Check 2: Get Discussions categories using GraphQL
  console.log('2️⃣ Checking Discussions categories...');
  try {
    const query = `
      query {
        repository(owner: "${OWNER}", name: "${REPO_NAME}") {
          discussionCategories(first: 10) {
            nodes {
              id
              name
              emoji
              description
              isAnswerable
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();

    if (data.errors) {
      console.log(`   ❌ GraphQL Error: ${JSON.stringify(data.errors)}\n`);
      return;
    }

    const categories = data.data.repository.discussionCategories.nodes;
    console.log(`   ✅ Found ${categories.length} categories:\n`);

    categories.forEach(cat => {
      console.log(`      ${cat.emoji} ${cat.name}`);
      console.log(`         ID: ${cat.id}`);
      console.log(`         Description: ${cat.description || 'None'}`);
      console.log(`         Answerable: ${cat.isAnswerable}\n`);
    });

    // Check if "Blog Comments" exists
    const blogCommentsCategory = categories.find(c => c.name === 'Blog Comments');

    if (!blogCommentsCategory) {
      console.log('   🚨 PROBLEM: "Blog Comments" category NOT found!\n');
      console.log('   💡 SOLUTION:');
      console.log('      1. Go to: https://github.com/' + OWNER + '/' + REPO_NAME + '/discussions/categories');
      console.log('      2. Click "New category"');
      console.log('      3. Name: "Blog Comments"');
      console.log('      4. Format: Announcement\n');

      console.log('   Available categories:');
      categories.forEach(cat => console.log(`      - ${cat.name}`));
      console.log();
    } else {
      console.log(`   ✅ "Blog Comments" category exists!`);
      console.log(`      Category ID: ${blogCommentsCategory.id}\n`);

      // Check if it matches .env
      const envCategoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
      if (blogCommentsCategory.id !== envCategoryId) {
        console.log(`   ⚠️  WARNING: Category ID mismatch!`);
        console.log(`      .env:   ${envCategoryId}`);
        console.log(`      Actual: ${blogCommentsCategory.id}\n`);
      }
    }

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}\n`);
  }

  // Check 3: Verify Giscus app installation
  console.log('3️⃣ Checking Giscus app installation...');
  console.log('   ℹ️  To verify Giscus is installed:');
  console.log('      1. Go to: https://github.com/apps/giscus');
  console.log('      2. Check if installed on: ' + OWNER + '/' + REPO_NAME);
  console.log('      3. If not, click "Install" and select the repository\n');

  // Check 4: Test Giscus API directly
  console.log('4️⃣ Testing Giscus API...');
  try {
    const giscusUrl = `https://giscus.app/api/discussions?repo=${encodeURIComponent(REPO)}&term=test&category=Blog+Comments&number=0&strict=false&last=15`;

    console.log(`   Testing: ${giscusUrl}\n`);

    const giscusResponse = await fetch(giscusUrl);
    console.log(`   Response: ${giscusResponse.status} ${giscusResponse.statusText}`);

    if (giscusResponse.ok) {
      const giscusData = await giscusResponse.json();
      console.log(`   ✅ Giscus API working!`);
      console.log(`   Discussions found: ${giscusData.discussion ? 'Yes' : 'No'}\n`);
    } else {
      console.log(`   ❌ Giscus API returned error\n`);

      if (giscusResponse.status === 404) {
        console.log('   🚨 This confirms the 404 error!\n');
        console.log('   Possible reasons:');
        console.log('   1. Repository is private and Giscus app not installed');
        console.log('   2. Category "Blog Comments" does not exist');
        console.log('   3. Giscus app does not have access to Discussions\n');
      }
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}\n`);
  }

  // Summary
  console.log('═'.repeat(60));
  console.log('📋 SUMMARY\n');
  console.log('Next steps:');
  console.log('1. Enable Discussions if not enabled');
  console.log('2. Create "Blog Comments" category if missing');
  console.log('3. Install Giscus app: https://github.com/apps/giscus');
  console.log('4. Update .env with correct CATEGORY_ID if needed');
  console.log('═'.repeat(60));
}

checkRepository().catch(console.error);
