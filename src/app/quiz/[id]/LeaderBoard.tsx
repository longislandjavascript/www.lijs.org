import { Section } from "components/Section";

type Props = {
  leaderboard: any;
};

export function LeaderBoard(props: Props) {
  const { leaderboard } = props;

  return (
    <Section title="Leaderboard ">
      {!leaderboard?.length && <p>Nothing to display yet.</p>}
      <table className="table-auto w-full text-left rounded-full">
        <thead>
          <tr className="surface text-primary uppercase text-base">
            <th className="p-2">Name</th>
            <th className="p-2">Correct</th>
            <th className="p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard?.map((v) => {
            const [name, score, count] = v;
            const percentageCorrect = parseFloat(
              ((score / count) * 100).toFixed(2)
            );
            return (
              <tr key={name} className="odd:surface-alt font-bold">
                <td className="p-2 text-2xl font-display">{name}</td>
                <td className="p-2">
                  <span className="inline-block rounded-full p-1 bg-yellow-500 w-16 text-center text-gray-800 ">
                    {score}
                  </span>
                </td>
                <td className="p-2">{percentageCorrect}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Section>
  );
}
