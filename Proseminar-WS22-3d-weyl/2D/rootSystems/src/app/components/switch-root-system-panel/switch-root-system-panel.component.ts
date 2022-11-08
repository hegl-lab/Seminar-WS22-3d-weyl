import { Component, OnInit } from '@angular/core';
import { rootSystems, RootSystems2D } from 'src/app/data/rootSystems';
import { RootSystemService } from 'src/app/logic/maths/root-system.service';
import RootSystem from 'src/app/logic/maths/RootSystem';

@Component({
  selector: 'app-switch-root-system-panel',
  templateUrl: './switch-root-system-panel.component.html',
  styleUrls: ['./switch-root-system-panel.component.sass']
})
export class SwitchRootSystemPanelComponent implements OnInit {
  RootSystems = RootSystems2D
  constructor(private rootSystemService: RootSystemService) {}

  ngOnInit(): void {
  }
  switchToRootSystem(rootSystem: RootSystems2D){
    this.rootSystemService.switchRootSystem(rootSystems[rootSystem])
  }
}
