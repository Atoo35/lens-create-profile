import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { apolloClient, apolloClientAuth } from "./utils/LensProtocol/apollo";
import { ENABLE_DISPATCHER_MUTATION } from "./utils/LensProtocol/queries";
import { formatAddress, signedTypeData } from "./utils/LensProtocol/utils";

export default function ProfileData({ profile }) {
  const [dispatcherdata, setDispatcherdata] = useState(null);
  const checkDispatcher = async () => {
    const data = await apolloClient.query({
      query: gql`
        query Profile($id: ProfileId!) {
          profile(request: { profileId: $id }) {
            dispatcher {
              address
              canUseRelay
            }
          }
        }
      `,
      variables: {
        id: profile.id,
      },
    });
    setDispatcherdata(data);
  };
  useEffect(() => {
    checkDispatcher();
  }, []);

  const eneableDispatcher = async () => {
    const result = await apolloClientAuth.mutate({
      mutation: gql(ENABLE_DISPATCHER_MUTATION),
      variables: {
        id: profile.id,
      },
    });
    const typedData = result.data.createSetDispatcherTypedData.typedData;
    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value
    );
    console.log(result.data.createSetDispatcherTypedData.id);
    const broadcast = await apolloClientAuth.mutate({
      mutation: gql`
        mutation Broadcast($request: BroadcastRequest!) {
          broadcast(request: $request) {
            ... on RelayerResult {
              txHash
              txId
            }
            ... on RelayError {
              reason
            }
          }
        }
      `,
      variables: {
        request: {
          id: result.data.createSetDispatcherTypedData.id,
          signature,
        },
      },
    });
  };
  return (
    <div className="mobile">
      <h2>Profile Id: {profile.id}</h2>
      <h2>Handle: {profile.handle}</h2>
      <h2 className="address">Owner: {formatAddress(profile.ownedBy)}</h2>
      {dispatcherdata?.data?.profile?.dispatcher === null && (
        <CustomButton text={"Enable Dispatcher "} onClick={eneableDispatcher} />
      )}
      {dispatcherdata?.data?.profile?.dispatcher !== null && (
        <h2>Dispatcher enabled</h2>
      )}
    </div>
  );
}
