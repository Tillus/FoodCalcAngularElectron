import { Component, OnInit } from '@angular/core';
//import { map } from 'rxjs';

enum Nutrients {
  protein = 1,
  vitaminB1,
}

class Ingredient {
  name: string;
  countable: boolean; //Ei: true; Mehl: false-> dann beziehen sich die Nährstoffe auf 100g
  amount: number; //entweder Gramm oder Stück.
  nutrients: Map<Nutrients, number>;

  constructor(
    amount: number,
    name: string,
    nutrients: Map<Nutrients, number>,
    countable: boolean
  ) {
    this.amount = amount;
    this.name = name;
    this.nutrients = nutrients;
    this.countable = countable;
  }
}

class Recipe {
  name: string;
  ingredients: Ingredient[];
  //hier gehören noch Arbeitsschritte dazu. Als Anleitung für den Nutzer und vllt. wegen Auswirkung auf Nährstoffe.
  nutrients: Map<Nutrients, number>;

  constructor(name: string, ingredients: Ingredient[]) {
    this.name = name;
    this.ingredients = ingredients;
    this.nutrients = new Map<Nutrients, number>();
    for (const nut of Object.values(Nutrients) as Nutrients[]) {
      this.nutrients.set(nut, 0);
    }
  }

  calcNutritionalValues(): void {
    for (const ing of this.ingredients) {
      for (const [nutrient, value] of ing.nutrients.entries()) {
        this.nutrients.set(
          nutrient,
          (this.nutrients.get(nutrient) || 0) + value * ing.amount
        );
      }
    }
  }
}

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'], // Add your styles if needed
})
export class FoodComponent implements OnInit {
  proteinTotal = 0; // Initialize the value
  vitaminB1Total = 0;

  ngOnInit() {
    //const egg = new Ingredient(4, 'egg', 7, 0.00006, false);
    const eggNutrients = new Map<Nutrients, number>();
    eggNutrients.set(Nutrients.protein, 7);
    eggNutrients.set(Nutrients.vitaminB1, 0.0006);
    const egg = new Ingredient(4, 'egg', eggNutrients, true);
    const pannedEggs = new Recipe('pannedEggs', [egg]);
    pannedEggs.calcNutritionalValues();
    this.proteinTotal = pannedEggs.nutrients.get(Nutrients.protein) || 0;
    this.vitaminB1Total = pannedEggs.nutrients.get(Nutrients.vitaminB1) || 0;
  }
}
