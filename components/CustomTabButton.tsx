import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';

export function CustomTabButton(props: BottomTabBarButtonProps) {
  return (
    <Pressable
      {...props}
      android_ripple={{ color: 'transparent' }}
      style={[
        props.style,
        {
          opacity: 1,
        },
      ]}
    />
  );
}
