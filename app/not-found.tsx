import NotFoundFallback from "@/components/errors/NotFoundFallback";

export default function NotFound() {
  return (
    <main>
      <NotFoundFallback
        statusCode={404}
        message="This page does not exist."
        buttonLabel="Go Home"
        redirect="/"
      />
    </main>
  );
}
