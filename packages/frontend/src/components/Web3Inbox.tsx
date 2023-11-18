import {
  useManageSubscription,
  useSubscription,
  useW3iAccount,
  useInitWeb3InboxClient,
  useMessages,
} from "@web3inbox/widget-react";
import { useCallback, useEffect } from "react";
import { useSignMessage, useAccount } from "wagmi";

export default function Web3Inbox() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // Initialize the Web3Inbox SDK
  const isReady = useInitWeb3InboxClient({
    // The project ID and domain you setup in the Domain Setup section
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID || "",
    domain: "dede-seven.vercel.app",

    // Allow localhost development with "unlimited" mode.
    // This authorizes this dapp to control notification subscriptions for all domains (including `app.example.com`), not just `window.location.host`
    isLimited: false,
  });

  const { account, setAccount, isRegistered, isRegistering, register } =
    useW3iAccount();
  useEffect(() => {
    if (!address) return;
    // Convert the address into a CAIP-10 blockchain-agnostic account ID and update the Web3Inbox SDK with it
    setAccount(`eip155:1:${address}`);
  }, [address, setAccount]);

  // In order to authorize the dapp to control subscriptions, the user needs to sign a SIWE message which happens automatically when `register()` is called.
  // Depending on the configuration of `domain` and `isLimited`, a different message is generated.
  const performRegistration = useCallback(async () => {
    if (!address) return;
    try {
      await register((message) => signMessageAsync({ message }));
    } catch (registerIdentityError) {
      alert(registerIdentityError);
    }
  }, [signMessageAsync, register, address]);

  useEffect(() => {
    // Register even if an identity key exists, to account for stale keys
    performRegistration();
  }, [performRegistration]);

  const { isSubscribed, isSubscribing, subscribe } = useManageSubscription();

  const performSubscribe = useCallback(async () => {
    // Register again just in case
    await performRegistration();
    await subscribe();
  }, [subscribe, isRegistered]);

  const { subscription } = useSubscription();
  const { messages } = useMessages();

  return (
    <>
      {!isReady ? (
        <div>Loading client...</div>
      ) : (
        <>
          {!address ? (
            <div>Connect your wallet</div>
          ) : (
            <>
              {!isRegistered ? (
                <div>
                  To manage notifications, sign and register an identity
                  key:&nbsp;
                  <button
                    onClick={performRegistration}
                    disabled={isRegistering}
                  >
                    {isRegistering ? "Signing..." : "Sign"}
                  </button>
                </div>
              ) : (
                <>
                  {!isSubscribed ? (
                    <>
                      <button
                        onClick={performSubscribe}
                        disabled={isSubscribing}
                        className="font-bold font-sans"
                      >
                        {isSubscribing
                          ? "Subscribing..."
                          : "🔔 Subscribe to notifications"}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="font-sans font-bold">
                        ✅ You are subscribed!
                      </div>
                      <p className="mt-6 mb-2 gap-y-3 font-sans font-bold">
                        Notifications
                      </p>
                      {messages.length > 0 ? (
                        messages.map((message) => {
                          return (
                            <div
                              className="flex flex-col px-4 py-4 border border-brand-primary bg-brand-text rounded-lg"
                              key={message.id}
                            >
                              <p className="font-bold font-sans mb-2">
                                {message.message.title}
                              </p>
                              <p className="font-sans">
                                {message.message.body}
                              </p>
                              <p className="font-sans text-sm italic mt-2">
                                {new Date(message.publishedAt).toISOString()}
                              </p>
                            </div>
                          );
                        })
                      ) : (
                        <div className="font-sans">No notifications yet</div>
                      )}
                    </>
                  )}
                </>
              )}
              <div className="flex flex-col overflow-auto my-6">
                <p className="my-2">Developer Info</p>
                <div className="text-sm">Address: {address}</div>
                <div className="text-sm">Account ID: {account}</div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
