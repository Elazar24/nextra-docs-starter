import Image from 'next/image';

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption: string;
}

export function ImageWithCaption({ src, alt, caption }: ImageWithCaptionProps) {
  return (
    <figure className='text-center justify-center my-4 w-full'>
      <div className='flex items-center justify-center'>
        <Image src={src} alt={alt} width={256} height={256} className=' rounded-xl ' />
      </div>

      <figcaption className='italic mt-2 text-sm leading-tight text-gray-500 dark:text-gray-400'>
        {caption}
      </figcaption>
    </figure>
  );
}
