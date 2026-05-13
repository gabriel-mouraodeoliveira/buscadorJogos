import NodeCache from "node-cache";

// ⏳ cache de 1 hora
const cache = new NodeCache({
  stdTTL: 60 * 60,
});

export default cache;