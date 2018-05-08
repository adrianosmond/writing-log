import React from 'react';
import MedalIcon from '../MedalIcon';

import { getLevelText } from '../../constants/utils';

const Medal = ({
  type = '',
  title = '',
  level = 0,
  detail = '',
}) =>
  <div className="medals__medal">
    <h2 className="medals__title">{title}</h2>
    <MedalIcon type={type} level={level} levelText={getLevelText(level)}/>
    <p className="medals__detail">{detail}</p>
  </div>;

export default Medal;
