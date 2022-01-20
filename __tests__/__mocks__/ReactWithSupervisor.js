jest.mock("react", () => {
    const actualReact = jest.requireActual("react");
    function useContext(context) {
        return Object.assign(Object.assign({}, actualReact.useContext(context)), {
            setSupervisorHash: (hash) => hash,
        });
    }
    return Object.assign(Object.assign({}, actualReact), { useContext: useContext });
});
//# sourceMappingURL=ReactWithSupervisor.js.map