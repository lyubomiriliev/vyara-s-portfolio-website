import { Body, Button, Heading, Html } from "@react-email/components";
import * as React from "react";

interface WelcomeProps {
  firstName: string;
  lastName: string;
  message: string;
}

export default function Welcome({
  firstName,
  lastName,
  message,
}: WelcomeProps) {
  return (
    <Html>
      <Heading>
        <h1>
          Hello Vyara, you have just received a message from {firstName}{" "}
          {lastName}
        </h1>
      </Heading>
      <Body>
        <p>{message}</p>
      </Body>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
}
