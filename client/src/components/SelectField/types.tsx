export type Props = {
  name: string;
  items: [];
  value?: string;
  onChange?: (v: any) => void;
};

export type SelectItem = {
  caption: string;
  value: string;
};
