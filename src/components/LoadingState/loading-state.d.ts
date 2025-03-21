import { ReactElement } from 'react';

export interface LoadingStateProps extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

function LoadingState(props: LoadingStateProps): ReactElement | null;
