import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TableData } from '../../types';

interface Props {
  icon: string;
  onClick: (data: TableData) => void;
  data: TableData
}

@Component({
  selector: 'table-button',
  standalone: true,
  imports: [MatButton, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements ICellRendererAngularComp {
  props!: Props;

  agInit(props: any): void {
    this.props = props;
  }

  refresh(props: any): boolean {
    this.props = props;

    return true;
  }

  onDelete() {
    if (this.props.onClick instanceof Function) {
      this.props.onClick(this.props.data);
    }
  }
}
