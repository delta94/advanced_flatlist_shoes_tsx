import { Animated, ImageSourcePropType } from 'react-native';

export interface DataProps {
  id: number;
  name: string;
  description: string;
  type: string;
  color: string;
  heading: string;
  image: ImageSourcePropType;
}

export interface CardProps {
  scrollX: Animated.Value;
  index: number;
  item: DataProps;
}

export interface TickerProps {
  scrollX: Animated.Value;
  data: DataProps[];
}

export interface CircleProps {
  scrollX: Animated.Value;
  data: DataProps[];
}
export interface PaginationProps {
  scrollX: Animated.Value;
  data: DataProps[];
}