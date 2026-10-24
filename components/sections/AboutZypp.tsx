import { CANONICAL_ENTITY_SENTENCE } from "@/lib/seo";

export default function AboutZypp() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            About Zypp Labs
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">
            {CANONICAL_ENTITY_SENTENCE} The company focuses on delay-tolerant
            networking and offline-first payments, building infrastructure on the
            Solana blockchain using native stablecoin rails. Zypp Labs is based
            in Nigeria and serves everyday users first, with plans to extend to
            banks and fintechs.
          </p>
        </div>

        <div className="mt-12 max-w-4xl">
          <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
            Frequently asked questions
          </h3>
          <div className="mt-8 space-y-8">
            <div>
              <h4 className="text-lg font-medium">
                What is Zypp Labs?
              </h4>
              <p className="mt-2 leading-relaxed text-ink/80">
                {CANONICAL_ENTITY_SENTENCE} Zypp Labs is a research and
                engineering company, not a startup, focused on building
                offline-capable payment infrastructure.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium">
                What is Zypp Pay and where does it stand?
              </h4>
              <p className="mt-2 leading-relaxed text-ink/80">
                Zypp Pay is a consumer app for sending and receiving money in
                Nigerian Naira without an internet connection. It is currently in
                version 2 closed beta on both iOS and Android. The public beta has
                finished. Zypp Pay is not yet on the App Store or Google Play, and
                no launch date has been announced.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium">
                What is Zypp SDK and what does it support?
              </h4>
              <p className="mt-2 leading-relaxed text-ink/80">
                The Zypp SDK is open to everyone and lets fintechs, wallets, and
                banks add offline-payment technology to their existing apps. It
                supports React Native (Expo), Rust, and Unity.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium">
                How do offline payments work?
              </h4>
              <p className="mt-2 leading-relaxed text-ink/80">
                Zypp Labs uses delay-tolerant networking approaches to enable
                device-to-device value exchange without an internet connection.
                When devices reconnect, transactions propagate to settle
                consistently on the ledger, as described in the company's
                published research.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium">
                What infrastructure does Zypp Labs build on?
              </h4>
              <p className="mt-2 leading-relaxed text-ink/80">
                Zypp Labs builds on the Solana blockchain using native stablecoin
                rails as the backend infrastructure.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium">
                Where does Zypp Labs operate?
              </h4>
              <p className="mt-2 leading-relaxed text-ink/80">
                Zypp Labs is based in Nigeria and focuses on the Nigerian market
                and the Naira. Other markets are planned for the future, but are
                not currently in scope.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium">
                Is Zypp Labs affiliated with other companies named Zypp?
              </h4>
              <p className="mt-2 leading-relaxed text-ink/80">
                No. Zypp Labs is not affiliated with Zypp Electric (an Indian EV
                company) or with ZYpp/libzypp/zypper (the openSUSE package
                manager).
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium">
                Is Zypp Labs a licensed or regulated financial institution?
              </h4>
              <p className="mt-2 leading-relaxed text-ink/80">
                No. Zypp Labs is not registered or licensed as a financial
                institution. No guarantees or unverifiable statistics are made.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
