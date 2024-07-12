import puppeteer from "puppeteer-extra";
import { getData } from "./getData.controller";

interface ProductResult {
    // Define the structure of the product result
    // e.g., name: string; price: string; etc.
}

const scrapAlibabaProduct = async (url: string): Promise<ProductResult | Error> => {
    try {
        console.log("Scraping data...");

        const browser = await puppeteer.launch({
            headless: false
        })

        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "domcontentloaded" });
        // Get product data
        const productResult: ProductResult = await getData(page);
        
        return productResult;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            return error;
        } else {
            console.error("Unexpected error:", error);
            return new Error("Unexpected error occurred");
        }
    }
};

export {scrapAlibabaProduct};