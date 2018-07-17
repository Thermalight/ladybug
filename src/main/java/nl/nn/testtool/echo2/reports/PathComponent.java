
package nl.nn.testtool.echo2.reports;

import nextapp.echo2.app.Button;
import nextapp.echo2.app.Column;
import nextapp.echo2.app.Insets;
import nextapp.echo2.app.Label;
import nextapp.echo2.app.Row;
import nextapp.echo2.app.event.ActionEvent;
import nextapp.echo2.app.event.ActionListener;
import nl.nn.testtool.echo2.Echo2Application;
import echopointng.tree.DefaultMutableTreeNode;

/**
 * @author m00f069
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class PathComponent extends Column implements ActionListener {
	private TreePane treePane;
	private DefaultMutableTreeNode node;
	private Label nameLabel;
	private Label stringLabel;

	public PathComponent() {
		super();
	}
	
	public void setTreePane(TreePane treePane) {
		this.treePane = treePane;
	}
	
	/**
	 * @see nl.nn.testtool.echo2.Echo2Application#initBean()
	 */
	public void initBean() {
		setInsets(new Insets(10));
		Row buttonRow = Echo2Application.getNewRow();
		add(buttonRow);

		Button expandAll  = new Button("Expand all");
		expandAll.setActionCommand("ExpandAll");
		Echo2Application.decorateButton(expandAll);
		expandAll.addActionListener(this);
		buttonRow.add(expandAll);

		Button collapseAll  = new Button("Collapse all");
		collapseAll.setActionCommand("CollapseAll");
		Echo2Application.decorateButton(collapseAll);
		collapseAll.addActionListener(this);
		buttonRow.add(collapseAll);

		nameLabel = Echo2Application.createInfoLabelWithColumnLayoutData();
		add(nameLabel);
	}

	public void displayPath(DefaultMutableTreeNode node, String path) {
		this.node = node;
		nameLabel.setText("Path: " + path);
	}

	/**
	 * @see nextapp.echo2.app.event.ActionListener#actionPerformed(nextapp.echo2.app.event.ActionEvent)
	 */
	public void actionPerformed(ActionEvent e) {
		if (e.getActionCommand().equals("ExpandAll")) {
			treePane.expandAll(node);
		} else if (e.getActionCommand().equals("CollapseAll")) {
			treePane.collapseAll(node);
		}
	}
}
