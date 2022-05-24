export default interface IInjectableExtensionModule {
    name: string;
    startModule: () => void;
}

