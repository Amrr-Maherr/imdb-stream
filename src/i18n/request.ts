import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
    const currentLocale: string = routing.locales.includes(locale as "en" | "ar")
        ? (locale as string)
        : routing.defaultLocale;

    return {
        locale: currentLocale,
        messages: (
            await import(`../messages/${currentLocale}.json`)
        ).default,
    };
});