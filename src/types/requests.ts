import { Request } from "express";
import { Day, Time } from "@prisma/client";

export interface RequestCreateMeal extends Request {
  body: {
    name: string;
    day: Day;
    time: Time;
    recipe_id: string;
  };
}
export interface RequestUpdateMeal extends Request {
  body: {
    name?: string;
    day?: Day;
    time?: Time;
    recipe_id?: string;
  };
}

export interface RequestCreateRecipe extends Request {
  body: {
    name: string;
    description: string;
    ingredients: string[];
    steps: string[];
    prep_time: number;
    cook_time: number;
  };
}

export interface RequestUpdateRecipe extends Request {
  body: {
    name?: string;
    description?: string;
    ingredients?: string[];
    steps?: string[];
    prep_time?: number;
    cook_time?: number;
  };
}
