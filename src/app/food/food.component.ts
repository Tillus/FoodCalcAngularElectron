import { Component, OnInit } from '@angular/core';
//import { map } from 'rxjs';

enum Nutrients {
  protein = 1,
  vitaminB1,
}

enum Verarbeitungsschritte {
  mischen = 1, //Quelle: Vitamin C bei https://www.zentrum-der-gesundheit.de/bibliothek/ratgeber/ernaehrungsratgeber/naehrstoffverluste  Vitamin B1 ( Thiamin), Vitamin B5 (Pantothensäure) und Vitamin C gehören
  kochen,
  daempfen,
  duensten,
  wiederErwaermen,
}

class Ingredient {
  name: string;
  countable: boolean; //Ei: true; Mehl: false-> dann beziehen sich die Nährstoffe auf 100g
  amount: number; //entweder Gramm oder Stück.
  nutrients: { [key in Nutrients]: number };

  constructor(
    amount: number,
    name: string,
    nutrients: { [key in Nutrients]: number },
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
  nutrients: { [key in Nutrients]: number };

  constructor(name: string, ingredients: Ingredient[]) {
    this.name = name;
    this.ingredients = ingredients;
    this.nutrients = {} as { [key in Nutrients]: number };
    for (const nut of Object.values(Nutrients) as Nutrients[]) {
      this.nutrients[nut] = 0;
    }
  }

  calcNutritionalValues(process: Verarbeitungsschritte): void {
    for (const ing of this.ingredients)
      for (const nut in Nutrients)
        if (isNaN(Number(nut))) {
          const nutrientEnumValue: Nutrients = //einzige variante, durch enum-Container zu iterieren.
            Nutrients[nut as keyof typeof Nutrients];
          this.nutrients[nutrientEnumValue] +=
            ing.nutrients[nutrientEnumValue] * ing.amount;
        }

    let degreasinVitamins: number;
    switch (process) {
      case Verarbeitungsschritte.daempfen:
        degreasinVitamins = 0.3;
        break;
      case Verarbeitungsschritte.duensten:
        degreasinVitamins = 0.25;
        break;
      case Verarbeitungsschritte.kochen:
      case Verarbeitungsschritte.wiederErwaermen:
        degreasinVitamins = 0.5;
        break;
      case Verarbeitungsschritte.mischen:
      default:
        degreasinVitamins = 0;
        break;
    }

    const heatInstableVitamins: Nutrients[] = [Nutrients.vitaminB1];

    for (const nutrient of heatInstableVitamins)
      this.nutrients[nutrient] *= degreasinVitamins;
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
    const egg = new Ingredient(
      4,
      'egg',
      {
        [Nutrients.protein]: 7,
        [Nutrients.vitaminB1]: 0.0006,
      },
      true
    );
    const pannedEggs = new Recipe('pannedEggs', [egg]);
    pannedEggs.calcNutritionalValues(Verarbeitungsschritte.kochen);
    this.proteinTotal = pannedEggs.nutrients[Nutrients.protein] || 0;
    this.vitaminB1Total = pannedEggs.nutrients[Nutrients.vitaminB1] || 0;
  }
}
