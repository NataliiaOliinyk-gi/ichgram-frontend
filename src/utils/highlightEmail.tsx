import type { ReactNode } from "react";

const highlightEmail = (text: string, email: string): ReactNode => {
  const parts = text.split(email);
  return (
    <>
      {parts[0]}
      <strong>{email}</strong>
      {parts[1]}
    </>
  );
};

export default highlightEmail;