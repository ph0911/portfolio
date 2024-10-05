import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  image,
  link,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image: string;
  link?: string;
}) => {
  const Content = (
    <div className="relative w-full h-[10rem] sm:h-80  md:h-80 overflow-hidden rounded-3xl group/bento transition duration-200">
      <Image
        src={image}
        alt={typeof title === 'string' ? title : 'Project image'}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40 dark:via-black/30 dark:to-black/60 " />
      <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-b from-transparent to-white/30 dark:to-black/30" />
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <h3 className="font-sans font-bold text-gray-800 dark:text-white text-lg sm:text-xl mb-1 sm:mb-2">{title}</h3>
          <p className="font-sans font-normal text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{description}</p>
        </div>
      </div>
    </div>
  );

  return link ? (
    <Link href={link} className={cn("block w-full", className)}>
      {Content}
    </Link>
  ) : (
    <div className={cn("w-full", className)}>
      {Content}
    </div>
  );
};