import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

type RenderStarsProps = {
    rating: number;
}
export default function RenderStars({ rating }: RenderStarsProps) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <div className="flex items-center text-dark-gold-color text-sm gap-0.5">
            <span className="text-dark-text text-xs font-semibold">{rating.toFixed(1)}</span>
            {Array(fullStars).fill(0).map((_, i) => (
                <FaStar key={`full-${i}`} size={15} />
            ))}
            {hasHalf && <FaStarHalfAlt size={15} />}
            {Array(emptyStars).fill(0).map((_, i) => (
                <FaRegStar key={`empty-${i}`} size={15} />
            ))}
        </div>
    );
};