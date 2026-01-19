'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export interface CalorieEstimation {
    food_name: string;
    estimated_calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    error?: string;
}

export async function estimateCalories(foodText: string): Promise<CalorieEstimation> {
    if (!apiKey) {
        console.error("GOOGLE_API_KEY is not set");
        return { food_name: "Error", estimated_calories: 0, error: "Server configuration error" };
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
    You are a calorie estimation assistant.
    Estimate the calories for the following food input: "${foodText}".
    
    Rules:
    - Return ONLY a JSON object.
    - If the input contains multiple items, sum them up or pick the main one, but preferably return the total.
    - Keys required: "food_name" (string), "estimated_calories" (number).
    - Keys optional: "protein" (g), "carbs" (g), "fat" (g).
    - If the input is not food (e.g. "hello", "table"), return { "food_name": "Unknown", "estimated_calories": 0 }.
    - Use Japanese for "food_name" if the input is Japanese.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Gemini Response:", text);
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Error:", error);
        return { food_name: "Error", estimated_calories: 0, error: "Failed to estimate" };
    }
}
