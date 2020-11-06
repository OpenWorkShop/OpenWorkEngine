import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { logManager, useLogger } from "@openworkshop/lib";
import FullCentered from "../FullCentered/FullCentered";
import { useQuery, gql } from "@apollo/client";

const MACHINE_PROFILES = gql`
  query machines {
    machineProfiles(query: "Maslow") {
      id
    }
  }
`;

const MachineProfileSearchBar: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery(MACHINE_PROFILES);
  const size = 100;

  const log = useLogger(MachineProfileSearchBar);
  log.debug("quem", loading, error, data);

  return (
    <FullCentered width={size}>
      {loading && <CircularProgress size={size} />}
    </FullCentered>
  );
};

export default MachineProfileSearchBar;
