import {Component, EventEmitter, Input, Output} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})

export class TreeComponent {
  @Output() emitEvent = new EventEmitter<any>();
  @Input() reports: any[] = [];
  treeId: string = Math.random().toString(36).substring(7);

  constructor() {
  }

  /**
   * Collapse the entire tree
   */
  collapseAll() {
    $('#' + this.treeId).treeview('collapseAll', { silent: true})
  }

  /**
   * Expand the entire tree (up to 2 levels)
   */
  expandAll() {
    $('#' + this.treeId).treeview('expandAll', { levels: 2, silent: true})
  }

  /**
   * Close all nodes in the tree
   */
  closeAll() {
    this.reports.length = 0;
    $('#' + this.treeId).treeview( 'remove');
  }

  /**
    Add a tree node and re-render the tree
   */
  handleChange() {
    // Reset the items in the tree
    let tree = [];
    console.log(this.reports)

    // For each item that has been selected show the node and its children
    for (let report of this.reports) {
      let rootNode = {
        text: report.name,
        ladybug: report,
        nodes: []
      }

      // Keep track of the previous node (which could be the parent)
      let previousNode: any = {};

      // For each of the child nodes add it to the parent
      for (let checkpoint of report.checkpoints) {
        let node = {
          text: checkpoint.name,
          ladybug: checkpoint,
          level: checkpoint.level
        }

        // If the previous node is its parent, push to the parent
        if (checkpoint.index > 0 && report.checkpoints[checkpoint.index - 1].level < checkpoint.level) {
          // If it doesnt have children yet, make sure it can have
          if (previousNode.nodes === undefined) {
            previousNode.nodes = [];
          }
          previousNode.nodes.push(node);
        } else {
          // Push it to the root
          // @ts-ignore
          rootNode.nodes.push(node)
          previousNode = node;
        }

      }
      tree.push(rootNode)
    }

    // Update the tree view
    $('#' + this.treeId).treeview({
      data: tree,
      levels: 5,
      expandIcon: "fa fa-plus",
      collapseIcon: "fa fa-minus",
      emptyIcon: "fa fa-arrow-left",
      selectedBackColor: "#1ab394",
    });

    // When a node is selected, we send forward the data to the display
    $('#' + this.treeId).on('nodeSelected', (event: any, data: any) => {
      this.emitEvent.next(data)
      console.log(data)
    });
  }

}
