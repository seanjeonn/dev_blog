import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
}

export function useTypewriter({
  words,
  typeSpeed = 150,
  deleteSpeed = 100,
  delayBetweenWords = 2000,
}: UseTypewriterOptions) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // 타이핑 중
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            // 단어 완성 - 잠시 대기 후 삭제 시작
            setTimeout(() => setIsDeleting(true), delayBetweenWords);
          }
        } else {
          // 삭제 중
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // 삭제 완료 - 다음 단어로
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
  ]);

  return currentText;
}
