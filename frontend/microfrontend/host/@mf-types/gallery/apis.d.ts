
    export type RemoteKeys = 'gallery/Login' | 'gallery/Register';
    type PackageType<T> = T extends 'gallery/Register' ? typeof import('gallery/Register') :T extends 'gallery/Login' ? typeof import('gallery/Login') :any;