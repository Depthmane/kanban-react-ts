declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.jpg" {
    const value: string;
    export = value;
}

declare module "*.png" {
    const value: string;
    export = value;
}

declare module "*.svg" {
    import React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export { ReactComponent };
    const value: string;
    export default value;
}