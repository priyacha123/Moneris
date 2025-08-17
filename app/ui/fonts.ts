import { Inter, Lusitana } from 'next/font/google';


// primary fonts -> body
export const inter = Inter({ subsets: ['latin'] })

// secondary fonts -> specific elements
export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
});
