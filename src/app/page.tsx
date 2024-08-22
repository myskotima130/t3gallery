const mockUrls = [
  "https://utfs.io/f/734438af-53e6-45b6-892f-83b74a33d9e4-22to.jpeg",
  "https://utfs.io/f/b18ae6b3-5a4f-4cfc-af00-84af1f65c383-1sj3pb.png",
  "https://utfs.io/f/0c66654a-58b2-4110-b1ab-c50eaddbacab-2tb.png",
  "https://utfs.io/f/8c241629-2bac-4f67-aad0-c36968e78570-20eer.webp",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div className="w-48" key={image.id}>
            <img src={image.url} alt={image.id} />
          </div>
        ))}
      </div>
    </main>
  );
}
