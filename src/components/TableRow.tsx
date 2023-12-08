type Props = {
  title: string;
  head?: Boolean;
  content?: string | null | undefined;
};

const TableRow = ({ head = false, title, content }: Props) => {
  if (head) {
    return (
      <th aria-colspan={2} className="text-lg">
        {title}
      </th>
    );
  }

  return (
    <tr>
      <td className="font-semibold text-base">{title}</td>
      <td className="text-primary text-lg">{content}</td>
    </tr>
  );
};

export default TableRow;
