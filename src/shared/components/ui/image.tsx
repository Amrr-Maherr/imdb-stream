import NextImage, { type ImageProps } from 'next/image';

export default function Image({
  placeholder = 'blur',
  blurDataURL = '/loading.svg',
  ...props
}: ImageProps) {
  return <NextImage {...props} placeholder={placeholder} blurDataURL={blurDataURL} />;
}
