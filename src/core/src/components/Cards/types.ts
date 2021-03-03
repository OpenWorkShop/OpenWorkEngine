import React from 'react';

export interface ICanClose {
  open: boolean;
  onClose: () => void;
}

export interface IMightBeDialog {
  open?: boolean; // undefined = not a dialog, true = dialog open, false = dialog closed.
  onClose?: () => void; // undefined = cannot be closed.
}

export interface IToolbarProps {
  header?: React.ReactNode; // If provided, title/tip are invalid.
  title?: string;
  tip?: string;
}

export interface ICardProps extends IToolbarProps {
  action?: React.ReactNode;
  subHeader?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  minContentHeight?: number;
}

export type CardWidgetProps = ICardProps & IMightBeDialog;
