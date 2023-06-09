type ReactTagProps<T> = import('react').ComponentPropsWithRef<T>;

declare namespace JSX {
    interface IntrinsicElements {
        search: any;
    }
}

type Network = { url: string; name: string };
