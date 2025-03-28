import type { IncomingMessage, ServerResponse } from "node:http";
import type { RenderHandler } from "../renderer/index.js";

/**
 * Execute a request handler that renders a React component to a stream, then streams it back to the client.
 * This function should be used as a request controller in an HTTP server.
 * @param handler A request handler that renders a React component to a stream.
 * @throws Error if the handler throws an error during rendering.
 * @returns The stream generated by the handler
 * @example ```ts
 * import express from "express";
 * import { serveStream } from "@canonical/react-ssr/server";
 * import { JSXRenderer } from "@canonical/react-ssr/renderer";
 * // htmlString is created by some build process that bundles the client code
 * import htmlString from "../../dist/client/index.html?raw";
 * import EntryServer from "./entry-server.js";
 *
 * // `EntryServer` is an instance of `@canonical/react-ssr/renderer/ReactServerEntrypointComponent`
 * const Renderer = new JSXRenderer(EntryServer, {
 *   htmlString,
 * });
 *
 * const ssrHandler = Renderer.render;
 *
 * const app = express();
 *
 * app.use("/(assets|public)", express.static("dist/client/assets"));
 * app.use(serveStream(ssrHandler));
 */
export function serveStream(handler: RenderHandler) {
  return (req: IncomingMessage, res: ServerResponse) => {
    try {
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Transfer-Encoding", "chunked");
      handler(req, res);
    } catch (error) {
      console.error("Error during rendering:", error);
      res.statusCode = 500;
      res.end("Internal server error");
    }
  };
}
