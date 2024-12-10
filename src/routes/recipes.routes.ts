import { Router } from "express";
import { Request, Response } from "express";
import { RequestCreateRecipe, RequestUpdateRecipe } from "../types/requests";
import prisma from "../db";

const router = Router();
export default router;

router.post("/recipes", async (req: RequestCreateRecipe, res: Response) => {
  try {
    const { name, description, ingredients, steps, prep_time, cook_time } =
      req.body;
    const newRecipe = {
      name,
      description,
      ingredients,
      steps,
      prep_time,
      cook_time,
    };
    const response = await prisma.recipe.create({ data: newRecipe });
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res
      .json(500)
      .json({ message: "Internal server Error while creating a new recipe. " });
  }
});

router.get("/recipes", async (req: Request, res: Response) => {
  try {
    const response = await prisma.recipe.findMany({ include: { Meal: true } });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .json(500)
      .json({ message: "Internal server Error while fetching recipes. " });
  }
});

router.get("/recipes/:id", async (req: Request, res: Response) => {
  try {
    const response = await prisma.recipe.findUnique({
      where: { id: req.params.id },
      include: { Meal: true },
    });
    if (response === null) {
      res.status(404).json({
        message: `no recipe with id ${req.params.id} was found`,
        data: [],
      });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .json(500)
      .json({ message: "Internal server Error while fetching recipes. " });
  }
});

router.patch(
  "/recipes/:id",
  async (req: RequestUpdateRecipe, res: Response) => {
    try {
      const { name, description, ingredients, steps, prep_time, cook_time } =
        req.body;
      const updatedREcipe = {
        name,
        description,
        ingredients,
        steps,
        prep_time,
        cook_time,
      };
      const response = await prisma.recipe.update({
        where: { id: req.params.id },
        data: updatedREcipe,
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res
        .json(500)
        .json({ message: "Internal server Error while updating recipe." });
    }
  }
);

router.delete("/recipes/:id", async (req: Request, res: Response) => {
  try {
    const response = await prisma.recipe.delete({
      where: { id: req.params.id },
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .json(500)
      .json({ message: "Internal server Error while deleting recipes. " });
  }
});
