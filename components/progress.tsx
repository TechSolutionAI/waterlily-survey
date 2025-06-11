

export default function Progress({ current, total }: { current: number; total: number }) {

    const percentage = (current / total) * 100;

    return (
        <div>
            <div className="text-end">{percentage}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mb-5">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                    ></div>
            </div>
        </div>
    );
}