import en from '../messages/en.json';

declare module '*.module.scss' {
  const styles: Record<string, string>;
  export default styles;
}

declare module '*.module.css' {
  const styles: Record<string, string>;
  export default styles;
}

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof en;
  }
}
