import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ModalProvider from "./components/counsel/modal/ModalProvider";
import NotFoundPage from "./components/NotFoundPage.jsx";

const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });

const routes = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

routes.push({
  path: "*",
  Element: NotFoundPage,
});

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

function App() {
  return (
    <div style={{ fontFamily: "WooriDaumR" }}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </div>
  );
}

export default App;
