import * as THREE from 'three';
import GWizCanvas from './GWizCanvas';
import {IMaterial, IVisualizerStyles, RenderGroupType} from '../types';
import {Logger} from '../../../utils/logging';

class SelectableObjectGroup extends THREE.Group {
  protected canvas: GWizCanvas;
  protected log: Logger;
  protected get styles(): IVisualizerStyles { return this.canvas.styles; }
  protected renderGroup: RenderGroupType;

  public get defaultMaterial(): IMaterial { return this.canvas.styles.renderGroups[this.renderGroup]; }
  public get isSelected(): boolean { return this.canvas.selectedUuid === this.uuid; }
  public get isHighlighted(): boolean { return this.canvas.highlightedUuid === this.uuid; }

  constructor(canvas: GWizCanvas, renderGroup: RenderGroupType) {
    super();
    this.canvas = canvas;
    this.log = this.canvas.log.logManager.getLogger(this.type);
    this.renderGroup = renderGroup;
  }

  public setMaterials(material?: IMaterial) {
    if (!material) material = this.defaultMaterial;
    const col = material?.color;
    this.traverse(obj => {
      const mesh = obj as THREE.Mesh;
      const mat = mesh?.material as THREE.MeshBasicMaterial;
      if (!mat || !col) {
        this.log.error('Invalid mesh in object group');
        return;
      }
      mat.color = new THREE.Color(col);
    });
  }
}

export default SelectableObjectGroup;
