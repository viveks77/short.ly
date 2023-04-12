export const ShortUrlConsts = {
    URL_EXPIRY_IN_DAYS : 1
}

export const BaseUrl = process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : `http://localhost:${process.env.PORT ?? 3000}`;

