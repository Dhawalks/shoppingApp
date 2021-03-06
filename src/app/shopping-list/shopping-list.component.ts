import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../utilities/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  ingredients:Ingredient[];
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingrdeintEmitter.subscribe((ingredients:Ingredient[]) => {
      this.ingredients = ingredients
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }

}
