export const healthService = () => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
};
