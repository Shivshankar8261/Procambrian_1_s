export function Approach() {
  return (
    <section id="approach" className="px-6 md:px-16 py-20 md:py-28">
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-12">
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-bone">
          Why grow it instead of designing it
        </h2>
        <div className="prose-body text-lichen space-y-5 text-[1.05rem]">
          <p>
            Procambium is the tissue in a plant that hasn&apos;t decided yet
            what it will become. It differentiates into xylem, which carries
            water up, and phloem, which carries sugar down — two jobs, one
            origin layer, no blueprint drawn in advance.
          </p>
          <p>
            We use the same logic for routing structure: grow toward the
            points that need to be reached, let the shape of the destinations
            decide the shape of the network, and only then assign what each
            branch carries.
          </p>
          <p>
            This is a method, not a finished product. We are validating it in
            simulation, at the seed and parameter level, before we claim it
            works on real infrastructure. The name&apos;s second half —
            Precambrian — is a reminder that structure like this takes long,
            unglamorous accumulation before anything resembling an explosion
            of forms.
          </p>
        </div>
      </div>
    </section>
  );
}
