import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { rootSystems } from 'src/app/data/rootSystems';
import RootSystem from './RootSystem';

@Injectable({
  providedIn: 'root'
})
export class RootSystemService {
  rootSystem: RootSystem = rootSystems.A2;
  repaintEvent: Subject<void> = new Subject();
  constructor() { }
  switchRootSystem(rootSystem: RootSystem){
    this.rootSystem = rootSystem
    this.repaintEvent.next();
  }
  getRoots(){
    return this.rootSystem.getAllRoots();
  }
  getWeylChambers(){
    return this.rootSystem.getAllWeylChambers();
  }
  getFundamentalWeylChamber(){
    return this.rootSystem.getFundamentalWeylChamber();
  }
  getType(){
    return this.rootSystem.type;
  }
}
