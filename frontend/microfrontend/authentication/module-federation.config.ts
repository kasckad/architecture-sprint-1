
export const mfConfig = {
  name: "authentication",
  exposes: {
    './Login':'./src/components/Login.tsx',
    './Register':'./src/components/Register.tsx',
    './InfoTooltip':'./src/components/InfoTooltip.tsx',
    './Profile':'./src/components/Profile.tsx'
  },
  shared: ["react", "react-dom"],
};
