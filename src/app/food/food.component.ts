import { Component, OnInit } from '@angular/core';

class Ingredient {
  name: string;
  //hier muss später noch eine Liste mit Nährstoffen stt ader einzelnen Nährstoffe rein
  countable: boolean; //Ei: true; Mehl: false-> dann beziehen sich die Nährstoffe auf 100g
  amount: number; //entweder Gramm oder Stück.
  protein_p: number; //p-> Prozentsatz -> entweder Anteil pro 100g bei nicht countable oder pro Stück bei countable.

  constructor(
    amount: number,
    name: string,
    protein: number,
    countable: boolean
  ) {
    this.amount = amount;
    this.name = name;
    this.protein_p = protein;
    this.countable = countable;
  }
}

class Recipe {
  name: string;
  ingredientsList: Ingredient[];
  //hier gehören noch Arbeitsschritte dazu. Als Anleitung für den Nutzer und vllt. wegen Auswirkung auf Nährstoffe.
  proteinTotal: number; //muss später noch durch Lister der gesamten Näherte ersetzt werden.

  constructor(name: string, ingrediensList: Ingredient[]) {
    this.name = name;
    this.ingredientsList = ingrediensList;
    this.proteinTotal = 0;
  }

  calcNutritionalValues() {
    this.ingredientsList.forEach((ing) => {
      this.proteinTotal += ing.amount * ing.protein_p;
    });
  }
}

/*const egg = new Ingredient(4, 'egg', 7, false);
const pannedEggs = new Recipe('pannedEggs', [egg]);
pannedEggs.calcNutritionalValues();
console.log(pannedEggs.proteinTotal);

// Get references to the list items using their IDs
const proteinItem = document.getElementById('protein');
if (proteinItem) {
  proteinItem.textContent = `${pannedEggs.name} contains ${pannedEggs.proteinTotal}gram of protein.`;
} */

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'], // Add your styles if needed
})
export class FoodComponent implements OnInit {
  proteinTotal = 0; // Initialize the value

  ngOnInit() {
    const egg = new Ingredient(4, 'egg', 7, false);
    const pannedEggs = new Recipe('pannedEggs', [egg]);
    pannedEggs.calcNutritionalValues();
    this.proteinTotal = pannedEggs.proteinTotal;
  }
}
