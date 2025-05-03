import { ThemeProvider } from 'next-themes'

export function Theme({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider >
            {children}
        </ThemeProvider>
    )
}